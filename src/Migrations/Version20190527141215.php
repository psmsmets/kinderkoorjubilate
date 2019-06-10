<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190527141215 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE blog_category (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, slug VARCHAR(50) NOT NULL, description VARCHAR(255) DEFAULT NULL, access LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\', created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, enabled TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_72113DE6989D9B62 (slug), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE carousel_slide (id INT AUTO_INCREMENT NOT NULL, event_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, show_title TINYINT(1) NOT NULL, publish_at DATETIME NOT NULL, publish_until DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, enabled TINYINT(1) NOT NULL, image VARCHAR(255) DEFAULT NULL, body LONGTEXT DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, overlay TINYINT(1) NOT NULL, url_button VARCHAR(255) DEFAULT NULL, INDEX IDX_BD7937A471F7E88B (event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE static_page (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, title_short VARCHAR(50) DEFAULT NULL, slug VARCHAR(50) NOT NULL, enabled TINYINT(1) NOT NULL, access LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\', created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, show_updated_at TINYINT(1) NOT NULL, keywords LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json_array)\', description VARCHAR(255) DEFAULT NULL, body LONGTEXT NOT NULL, image VARCHAR(255) DEFAULT NULL, document VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8FA4EF95989D9B62 (slug), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE blog_post (id INT AUTO_INCREMENT NOT NULL, category_id INT NOT NULL, author_id INT NOT NULL, event_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, title_short VARCHAR(50) DEFAULT NULL, slug VARCHAR(50) NOT NULL, enabled TINYINT(1) NOT NULL, special TINYINT(1) NOT NULL, pinned TINYINT(1) NOT NULL, archived TINYINT(1) NOT NULL, access LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\', publish_at DATETIME NOT NULL, publish_until DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, keywords LONGTEXT NOT NULL COMMENT \'(DC2Type:json_array)\', description VARCHAR(255) DEFAULT NULL, body LONGTEXT DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, document VARCHAR(255) DEFAULT NULL, INDEX IDX_BA5AE01D12469DE2 (category_id), INDEX IDX_BA5AE01DF675F31B (author_id), INDEX IDX_BA5AE01D71F7E88B (event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, mobile_phone VARCHAR(15) NOT NULL, enabled TINYINT(1) NOT NULL, verified TINYINT(1) NOT NULL, is_active TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, last_login_at DATETIME DEFAULT NULL, password_updated_at DATETIME NOT NULL, secret VARCHAR(128) DEFAULT NULL, secret_expiration DATETIME NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D649AA92691 (mobile_phone), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contact_form (id INT AUTO_INCREMENT NOT NULL, question VARCHAR(255) NOT NULL, email LONGTEXT NOT NULL COMMENT \'(DC2Type:simple_array)\', created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, enabled TINYINT(1) NOT NULL, sequence INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE calendar_category (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, slug VARCHAR(50) NOT NULL, description VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, sequence INT NOT NULL, enabled TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_32E39A9989D9B62 (slug), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE calendar_event (id INT AUTO_INCREMENT NOT NULL, category_id INT NOT NULL, static_page_id INT DEFAULT NULL, uuid VARCHAR(128) NOT NULL, title VARCHAR(255) NOT NULL, enabled TINYINT(1) NOT NULL, archived TINYINT(1) NOT NULL, cancelled TINYINT(1) NOT NULL, start_time DATETIME NOT NULL, end_time DATETIME DEFAULT NULL, all_day TINYINT(1) NOT NULL, location VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, document VARCHAR(255) DEFAULT NULL, body LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, url VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_57FA09C9D17F50A6 (uuid), INDEX IDX_57FA09C912469DE2 (category_id), INDEX IDX_57FA09C995C43776 (static_page_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contact_faq (id INT AUTO_INCREMENT NOT NULL, question VARCHAR(255) NOT NULL, answer LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, enabled TINYINT(1) NOT NULL, sequence INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE carousel_slide ADD CONSTRAINT FK_BD7937A471F7E88B FOREIGN KEY (event_id) REFERENCES calendar_event (id)');
        $this->addSql('ALTER TABLE blog_post ADD CONSTRAINT FK_BA5AE01D12469DE2 FOREIGN KEY (category_id) REFERENCES blog_category (id)');
        $this->addSql('ALTER TABLE blog_post ADD CONSTRAINT FK_BA5AE01DF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE blog_post ADD CONSTRAINT FK_BA5AE01D71F7E88B FOREIGN KEY (event_id) REFERENCES calendar_event (id)');
        $this->addSql('ALTER TABLE calendar_event ADD CONSTRAINT FK_57FA09C912469DE2 FOREIGN KEY (category_id) REFERENCES calendar_category (id)');
        $this->addSql('ALTER TABLE calendar_event ADD CONSTRAINT FK_57FA09C995C43776 FOREIGN KEY (static_page_id) REFERENCES static_page (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE blog_post DROP FOREIGN KEY FK_BA5AE01D12469DE2');
        $this->addSql('ALTER TABLE calendar_event DROP FOREIGN KEY FK_57FA09C995C43776');
        $this->addSql('ALTER TABLE blog_post DROP FOREIGN KEY FK_BA5AE01DF675F31B');
        $this->addSql('ALTER TABLE calendar_event DROP FOREIGN KEY FK_57FA09C912469DE2');
        $this->addSql('ALTER TABLE carousel_slide DROP FOREIGN KEY FK_BD7937A471F7E88B');
        $this->addSql('ALTER TABLE blog_post DROP FOREIGN KEY FK_BA5AE01D71F7E88B');
        $this->addSql('DROP TABLE blog_category');
        $this->addSql('DROP TABLE carousel_slide');
        $this->addSql('DROP TABLE static_page');
        $this->addSql('DROP TABLE blog_post');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE contact_form');
        $this->addSql('DROP TABLE calendar_category');
        $this->addSql('DROP TABLE calendar_event');
        $this->addSql('DROP TABLE contact_faq');
    }
}
