-- Create a new table called 'FavoriteMatches' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.FavoriteMatches', 'U') IS NOT NULL
DROP TABLE dbo.FavoriteMatches
GO
-- Create the table in the specified schema
CREATE TABLE dbo.FavoriteMatches
(
    -- two primary key column
    username VARCHAR(10) NOT NULL,
    match_id INT NOT NULL,
    PRIMARY KEY (username, match_id),
    FOREIGN KEY (username) 
    REFERENCES Users (username)
    ON DELETE NO ACTION ON UPDATE NO ACTION,

);
GO