<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use App\Entity\ContactForm;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class ContactFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('question', EntityType::class, array(
                'class' => ContactForm::class,
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('c')
                        ->where('c.enabled = :enabled')
                        ->setParameter('enabled', true)
                        ->orderBy('c.sequence', 'ASC')
                        ;
                },
                'label'    => 'Mijn vraag gaat over',
                //'attr' => ['class'=>'custom-select'],
                'required' => true,
                'placeholder' => '-- Maak een keuze --',
                ))
            ->add('message', TextareaType::class, array(
                'label'    => 'Stel je vraag',
                'attr' => ['rows'=>8],
                'required' => true,
                ))
            ->add('name', TextType::class, array(
                'label'    => 'Je naam',
                'attr' => ['placeholder'=>'Naam'],
                'required' => true,
                ))
            ->add('email', RepeatedType::class, array(
                'type' => EmailType::class,
                'help' => 'We houden je e-mail adres strikt voor onszelf.',
                'first_options' => array(
                    'label'    => 'Je e-mail adres',
                    'attr' => ['placeholder'=>'E-mail'],
                    'required' => true,
                    ),
                'second_options' => array(
                    'label' => false,
                    'attr' => ['placeholder'=>'Bevestig e-mail'],
                    'required' => true,
                    ),
                ))
            ->add('copy', CheckboxType::class, array(
                'label'    => 'Stuur mij een kopie',
                'data' => true,
                'required' => false,
                ))
            ->add('terms', CheckboxType::class, array(
                'label'    => 'Privacybeleid',
                'required' => true,
                'mapped' => false,
                ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
