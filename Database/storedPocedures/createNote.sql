CREATE OR ALTER PROCEDURE createNoteProcedure(@id VARCHAR(200), @note_title  VARCHAR(200), @content VARCHAR(500), @createdAt DATE)
AS
BEGIN
    INSERT INTO notesTable(id, note_title, content, createdAt) VALUES (@id, @note_title , @content, @createdAt)
END


-- DROP PROC createProjectPROC
SELECT * FROM notesTable