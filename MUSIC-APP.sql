ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'meiron12';
flush privileges;

DROP DATABASE IF EXISTS music_app;
CREATE DATABASE music_app;
USE music_app;

CREATE TABLE `Songs`(
    `Song_id` INT NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(255) NOT NULL,
    `Artist_id` INT NOT NULL,
    `Album_id` INT NOT NULL,
    `Length` TIME NOT NULL,
    `Track_Number` INT NOT NULL,
    `Lyrics` VARCHAR(255) NOT NULL,
    `Releasd_at` DATE NOT NULL,
    `Upload_at` DATE NOT NULL,
    `youtube` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`Song_id`)
    
);

CREATE TABLE `Albums`(
    `Album_id` INT NOT NULL AUTO_INCREMENT,
    `Album_Name` VARCHAR(255) NOT NULL,
    `Artist_id` INT NOT NULL,
    `Cover_img` VARCHAR(255) NOT NULL,
    `Released_at` DATE NOT NULL,
    `Uploaded_at` DATE NOT NULL,
    PRIMARY KEY(`Album_id`)
    
);

CREATE TABLE `Artists`(
    `Artist_id` INT NOT NULL AUTO_INCREMENT,
    `Artist_Name` VARCHAR(255) NOT NULL,
    `Cover_img` varchar(255),
    `Uploaded_at` DATE NOT NULL,
    PRIMARY KEY(`Artist_id`)
);

CREATE TABLE `Playlists`(
    `Playlist_id` INT NOT NULL AUTO_INCREMENT,
    `Playlist_Name` VARCHAR(255) NOT NULL,
    `Cover_img` VARCHAR(255) NOT NULL,
    `Uploaded_at` DATE NOT NULL,
    PRIMARY KEY(`Playlist_id`)
	
);

CREATE TABLE `Libraries`(
    `User_id` INT NOT NULL,
    `Song_id` INT NOT NULL,
    `Playlist_id`INT NOT NULL
);

CREATE TABLE `Users`(
    `User_id` INT NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(255) UNIQUE NOT NULL,
    `Email` VARCHAR(255) UNIQUE NOT NULL,
    `Password` CHAR(255) NOT NULL,
    `Created_at` DATE NOT NULL,
    `Is_admin` TINYINT(1) NOT NULL,
    `Preferences` JSON NOT NULL,
    `Remeber_token` TINYINT(1) NOT NULL,
    PRIMARY KEY(`User_id`)
);

CREATE TABLE `Interactions`(
    `Interaction_id` INT NOT NULL AUTO_INCREMENT,
    `Song_id` INT NOT NULL,
    `User_id` INT NOT NULL,
    `Is_liked` TINYINT(1) NOT NULL,
    `Play_count` INT NOT NULL,
    `Created_at` DATE NOT NULL,
    PRIMARY KEY(`Interaction_id`)
);

ALTER TABLE `Songs`
ADD CONSTRAINT `FK_Artist_id_songs` FOREIGN KEY (`Artist_id`) REFERENCES `Artists`(`Artist_id`)  ON DELETE CASCADE,
ADD CONSTRAINT `FK_Album_id_songs` FOREIGN KEY (`Album_id`) REFERENCES `Albums`(`Album_id`) ON DELETE CASCADE;
   
ALTER TABLE `Albums`
ADD CONSTRAINT `FK_Artist_id_albums` FOREIGN KEY(`Artist_id`) REFERENCES `Artists`(`Artist_id`) ON DELETE CASCADE;

ALTER TABLE `Libraries`
ADD CONSTRAINT `FK_User_id_libraries` FOREIGN KEY(`User_id`) REFERENCES `Users`(`User_id`) ON DELETE CASCADE,
ADD CONSTRAINT `FK_Song_id_libraries` FOREIGN KEY(`Song_id`) REFERENCES `Songs`(`Song_id`) ON DELETE CASCADE,
ADD CONSTRAINT `FK_Playlist_id_libraries` FOREIGN KEY(`Playlist_id`) REFERENCES `Playlists`(`Playlist_id`) ON DELETE CASCADE;

ALTER TABLE `Interactions`
ADD CONSTRAINT `FK_Song_id_interactions` FOREIGN KEY(`Song_id`) REFERENCES `Songs`(`Song_id`),
ADD CONSTRAINT `FK_User_id_interactions` FOREIGN KEY(`User_id`) REFERENCES `Users`(`User_id`);
