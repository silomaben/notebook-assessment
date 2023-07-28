CREATE OR ALTER PROCEDURE updateNote (@id VARCHAR(200), @note_title  VARCHAR(200), @content VARCHAR(500), @createdAt DATE)
AS
    BEGIN
        UPDATE projectsTable SET id= @id, note_title = @note_title, content = @content, createdAt = @createdAt WHERE id= @id
    END