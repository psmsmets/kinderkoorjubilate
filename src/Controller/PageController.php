<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;

# entities
use App\Entity\StaticPage;
use App\Entity\BlogPost;
use App\Entity\BlogCategory;
use App\Entity\CarouselSlide;
use App\Entity\ContactFaq;
use App\Entity\ContactForm;
use App\Entity\CalendarCategory;
use App\Entity\CalendarEvent;

# repositories
use App\Repository\StaticPageRepository;
use App\Repository\BlogPostRepository;
use App\Repository\BlogCategoryRepository;
use App\Repository\CarouselSlideRepository;

# forms
use App\Form\ContactFormType;

class PageController extends AbstractController
{
    private $template_data = [];
    protected $requestStack;
    private $security;
    private $now;
    private $em;

    public function __construct(RequestStack $requestStack, Security $security, EntityManagerInterface $em)
    {
        $this->requestStack = $requestStack;
        $this->security = $security;
        $this->em = $em;
        $this->now = new \DateTime('now');
    }

    private function initTemplateData()
    {
        $this->template_data = [];
        $this->addToTemplateData( 
            'calendar_events', 
            $this->getDoctrine()
                ->getRepository(CalendarEvent::class)
                ->findUpcomingCalendarEvents(7), 
            'base'
            );
    }

    private function addToTemplateData(string $key, $data, string $cat = 'page')
    {
        $this->template_data[$cat][$key] = $data;
    }

    private function pageReturnCookie(string $cookie, Request $request): ?\DateTime
    {
        $lastvisit = null;

        if ($request->cookies->has($cookie)) {
            $lastvisit = new\DateTime;
            $lastvisit->setTimestamp($request->cookies->get($cookie));
        }

        $now = time();

        $response = new Response();
        $response->headers->setCookie(Cookie::create($cookie, $now, (2 * 365 * 24 * 60 * 60) + $now ));
        $response->send();

        return $lastvisit;
    }

    private function pageVisitedCookie(string $cookie, Request $request): bool
    {
        $visited = $request->cookies->has($cookie);

        if (!$visited) {
            $response = new Response();
            $response->headers->setCookie(Cookie::create($cookie, 1, (2 * 365 * 24 * 60 * 60) + $now ));
            $response->send();
        }

        return $visited;
    }

    /**
     * @Route("/", name="homepage")
     */
    public function index()
    {
        $this->initTemplateData();

        $this->addToTemplateData( 'carousel', $this->getDoctrine()
                ->getRepository(CarouselSlide::class)
                ->findCarouselSlides($this->security->isGranted('ROLE_ADMIN'))
            );

        $this->addToTemplateData( 'pinned_blog_post', $this->getDoctrine()
                ->getRepository(BlogPost::class)
                ->findSpecialPinnedBlogPost()
            );

        $this->addToTemplateData( 'special_blog_posts', $this->getDoctrine()
                ->getRepository(BlogPost::class)
                ->findSpecialBlogPosts($limit = BlogPost::NUMBER_OF_ITEMS_HOMEPAGE)
            );
        $this->addToTemplateData( 'calendar', $this->getDoctrine()
                ->getRepository(CalendarEvent::class)
                ->findUpcomingCalendarEvents($limit)
            );

        return $this->render('page/public.html.twig', $this->template_data);
    }

    /**
     * @Route("/{slug}", name="static_page")
     */
    public function static_page($slug)
    {
        $static = $this->getDoctrine()
            ->getRepository(StaticPage::class)
            ->findBySlug($slug);

        if (!$static) throw $this->createNotFoundException();
        if (!$static->getEnabled()) $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $this->initTemplateData();
        $this->addToTemplateData('static',$static);

        return $this->render('page/static.html.twig', $this->template_data );
    }

    /**
     * @Route("/blog/{id}/{slug}", name="blog_post")
     */
    public function blog_post(int $id, string $slug = null)
    {
        $blogPost = $this->getDoctrine()
            ->getRepository(BlogPost::class)
            ->findBlogPost($id);

        if (!$blogPost) throw $this->createNotFoundException();
        if ($blogPost->getPublishAt()>$this->now or !$blogPost->getEnabled()) $this->denyAccessUnlessGranted('ROLE_ADMIN');
 
        if (is_null($slug) or $slug != $blogPost->getSlug())
        {
            return $this->redirectToRoute('blog_post', ['id' => $id, 'slug' => $blogPost->getSlug() ]);
        }

        $this->initTemplateData();
        $this->addToTemplateData( 'blog_post', $blogPost );

        return $this->render('page/post.html.twig', $this->template_data );
    }

    /**
     * @Route("/blog/{slug}", name="blog_category")
     */
    public function blog_category(string $slug = null)
    {
        if (!is_null($slug)) {

            $blogCategory = $this->getDoctrine()
                ->getRepository(BlogCategory::class)
                ->findOneBy(
                    ['slug' => $slug, 'enabled' => true ]
                );

            if (!$blogCategory) {
                throw $this->createNotFoundException();
            }

        } else {

            $blogCategory = null;

        }

        $repository = $this->getDoctrine()->getRepository(BlogPost::class);
        $request = Request::createFromGlobals();

        $page = (int) $request->query->get('pagina', 1);
        $last_page = $repository->getBlogPostPages( $slug );

        $page = $page < 1 ? 1 : $page;
        $page = $page > $last_page ? $last_page : $page;

        $this->initTemplateData();
        $this->addToTemplateData( 'blog_category', $blogCategory );
        $this->addToTemplateData( 
                'blog_posts', 
                $repository->findBlogPosts( $blogCategory, $page, $this->security->isGranted('ROLE_ADMIN') )
            );
        $this->addToTemplateData( 'pagination', 
            ['current' => $page, 'last' => $last_page, 'isfirst' => $page==1, 'islast'=> $page==$last_page]
        );

        return $this->render('page/blog.html.twig', $this->template_data );
    }

    /**
     * @Route("/kalender", name="calendar")
     */
    public function calendar()
    {
        return $this->redirectToRoute('calendar_list', ['year' => $this->getCurrentCalendarYear() ]);
    }

    private function getCurrentCalendarYear(): ?int
    {
        if ((int)date("m")>8) {
            return (int) date('Y');
        } else {
            return (int) date('Y', strtotime(date('Y').' -1 year'));
        }
    }

    /**
     * @Route("/kalender/{year}", name="calendar_list")
     */
    public function calendar_list(int $year = null, Request $request)
    {
        if (is_null($year) or $year < 2016 or $year > 2050 ) {
            return $this->redirectToRoute('calendar_list', ['year' => $this->getCurrentCalendarYear() ]);
        }

        $start = strval($year).'-09-01 00:00';
        $end   = date('Y-m-d H:i', strtotime(strval($year).'-09-01 +1 year'));

        $this->initTemplateData();
        $this->addToTemplateData( 'lastvisit',
            $this->pageReturnCookie('calendar_list', $request)
        );
        $this->addToTemplateData( 'calendar_categories', $this->getDoctrine()
            ->getRepository(CalendarCategory::class)
            ->findAllEnabled()
        );
        $this->addToTemplateData( 'calendar_events', $this->getDoctrine()
            ->getRepository(CalendarEvent::class)
            ->findCalendarEvents($start,$end)
        );
        $this->addToTemplateData( 'calendar_period', ['start'=>new \DateTime($start),'end'=>new \DateTime($end)]);

        return $this->render('calendar/list.html.twig', $this->template_data );
    }

    /**
     * @Route("/kalender/{uuid}", name="calendar_event")
     */
    public function calendar_event (string $uuid, Request $request)
    {
        $event = $this->getDoctrine()
            ->getRepository(CalendarEvent::class)
            ->findCalendarEvent($uuid)
            ;
        if (!$event) {
            throw $this->createNotFoundException();
            //return $this->redirectToRoute('calendar_list', ['year' => $this->getCurrentCalendarYear() ]);
        }

        $lastvisit = $this->pageReturnCookie('calendar_event_'.$uuid, $request);

        $this->initTemplateData();
        $this->addToTemplateData( 'calendar_event', $event);
        $this->addToTemplateData( 'calendar_posts', $this->getDoctrine()
            ->getRepository(BlogPost::class)
            ->findCalenderEventBlogPosts($uuid)
        );

        return $this->render('calendar/event.html.twig', $this->template_data );
    }

    /**
     * @Route("/contact/faq", name="contact_faq")
     */
    public function contact_faq()
    {
        $this->initTemplateData();
        $this->addToTemplateData( 'faqs', $this->getDoctrine()
                ->getRepository(ContactFaq::class)
                ->findAllEnabled()
            );

        return $this->render('contact/faq.html.twig', $this->template_data );
    }

    /**
     * @Route("/contact/formulier", name="contact_form")
     */
    public function contact_form(Request $request, \Swift_Mailer $mailer)
    {
        $form = $this->createForm(ContactFormType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $data = $form->getData();

            $message = (new \Swift_Message('HoZT.be contactformulier'))
                ->setFrom(array($this->getParameter('app.mailer.from')=>$this->getParameter('app.mailer.name')))
                ->setTo($data['question']->getEmail())
                ->setReplyTo($data['email'])
                ->setBody(
                    $this->renderView(
                        'emails/contactform.html.twig', $data
                    ),
                    'text/html'
                )
            ;
            if ($data['copy']) $message->setBcc($data['email']);

            $result = $mailer->send($message);

            if ($result) { 
                $this->addFlash('success', 'Bericht verzonden! Dankjewel om ons te contacteren.');
            } else {
                $this->addFlash('danger', 'Sorry, er ging iets verkeerd. Controleer of alle velden correct ingevuld zijn en probeer later opnieuw.');
            }

            return $this->redirectToRoute('contact_form');

        }

        $this->initTemplateData();
        $this->addToTemplateData( 'form', $form->createView() );

        return $this->render('contact/form.html.twig', $this->template_data );
    }

}
