BEGIN 
    TRY
        CREATE TABLE notesTable(
            id VARCHAR(200) PRIMARY KEY,
            note_title VARCHAR(500) NOT NULL,
            content VARCHAR(1000) NOT NULL,
            createdAt DATE NOT NULL,
        )
    END TRY
BEGIN   
    CATCH
        THROW 50001, 'Table already Exists!', 1;
    END CATCH