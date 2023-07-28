CREATE OR ALTER PROCEDURE fetchOneNote (@id VARCHAR(200))
AS  
    BEGIN 
        SELECT * FROM notesTable WHERE id = @id
    END