import mssql from 'mssql'
import { createNewNote, deleteNote, fetchAllNotes, fetchOneNote, updateNote } from './notebookController'

const res = {json: jest.fn()}

describe('Note controllers',()=>{



describe('creating a new note',()=>{


    it('should create a new note successfully', async ()=>{
            const req = {
                body: {
                    note_title: "Smile a little",
                    content: "It works, don’t touch!"
                }
            }

            const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                connected: true,
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: 1
                })
            })
 
            await createNewNote(req,res)

            expect(res.json).toHaveBeenCalledWith({
                message: "Note created successfully"
            })


            res.json.mockRestore()
            

    })

    it('should verify all input fields are filled',async function(){

        const body = {
            note_title: "Build Dam",
        }

        const request = {body:body}

        await createNewNote(request,res)

        expect(res.json).toHaveBeenCalledWith({
            message: "please input all fields"
        })

        res.json.mockRestore()


    })
})

describe("updating note",()=>{

    it("should update a note successfully", async()=>{
        const updatedNote = {
            note_title: "Bryson Potts Note",
            content: "I be silent on it but I keep on smilling"
        }

        const mockedNoteId = '969f9f87-e948-4895-a183-21474d3ced78'

        const req = {
            params:{
                id:mockedNoteId
            },
            body: updatedNote
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })

        await updateNote(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Note updated successfully"
        })

        res.json.mockRestore()
    })

    it('should verify all input fields are filled',async function(){

        const body = {
            note_title: "greet them all",
        }

        const request = {body:body}

        await createNewNote(request,res)

        expect(res.json).toHaveBeenCalledWith({
            message: "please input all fields"
        })

        res.json.mockRestore()


    })

    it("should return error when project ID does not exist", async ()=>{
        const updatedNote = {
            "id": "bac727c4-4178-427a-a239-063f5c58ae86",
            "note_title": "Smile a little",
            "content": "It works, don’t touch!",
            "createdAt": "2023-08-03T00:00:00.000Z"
          }

        const mockedNoteId = '969f9f87-e948-4895-a183-21474d3oiuytrrtyuoiuytced78'
        
        const req = {
            params:{
                id:mockedNoteId
            },
            body: updatedNote
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [0]
            })
        })

        await updateNote(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: 'Note not found'
        })

        res.json.mockRestore()
    })

})


describe("fetching one note",()=>{

    it("should fetch one note",async()=>{

        const mockedNote = {
            "id": "bac727c4-4178-427a-a239-063f5c58ae86",
            "note_title": "Smile a little",
            "content": "It works, don’t touch!",
            "createdAt": "2023-08-03T00:00:00.000Z"
          }

        const mockedNoteId = 'bac727c4-4178-427a-a239-063f5c58ae86'


        const req = {
            params: {
                id: mockedNoteId
            }
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [mockedNote]
            })
        })

        await fetchOneNote(req, res)

        expect(res.json).toHaveBeenCalledWith({note: [ mockedNote ]})

        res.json.mockRestore()


    })

})


describe("fetch all notes",()=>{

    
    it('should fetch all notes inside the notebook',async()=>{
        const res = {json: jest.fn()}
        const mockedNotes = [{
            "id": "08151f87-4f24-4621-924f-2f9c38314d5b",
            "note_title": "Smile a little",
            "content": "It works, don’t touch!",
            "createdAt": "2023-08-04T00:00:00.000Z"
          },
          {
            "id": "09c0f2a8-e15f-4b22-a3d9-356c639e4ed6",
            "note_title": "Smile a little",
            "content": "It works, don’t touch!",
            "createdAt": "2023-08-04T00:00:00.000Z"
          },
          {
            "id": "94309207-5445-4299-bcf3-558016e7d183",
            "note_title": "Bryson Potts Note",
            "content": "I be silent on it but I keep on smilling",
            "createdAt": "2023-08-04T00:00:00.000Z"
          },
          {
            "id": "969f9f87-e948-4895-a183-21474d3ced78",
            "note_title": "Smile a little",
            "content": "It works, don’t touch!",
            "createdAt": "2023-08-01T00:00:00.000Z"
          },
          {
            "id": "bac727c4-4178-427a-a239-063f5c58ae86",
            "note_title": "Smile a little",
            "content": "It works, don’t touch!",
            "createdAt": "2023-08-03T00:00:00.000Z"
          },
          {
            "id": "c418169c-9895-4745-8e32-babdf9b76954",
            "note_title": "Smile a little",
            "content": "It works, don’t touch!",
            "createdAt": "2023-08-04T00:00:00.000Z"
          },
          {
            "id": "cbfecc46-f4f3-4bd5-834a-209a4d6a8e51",
            "note_title": "Smile a little",
            "content": "It works, don’t touch!",
            "createdAt": "2023-08-01T00:00:00.000Z"
          },
          {
            "id": "d7f8c4dd-f8cc-4b45-8b31-1690077473f7",
            "note_title": "Smile a little",
            "content": "It works, don’t touch!",
            "createdAt": "2023-08-04T00:00:00.000Z"
          }]

        const req = {}

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: mockedNotes
            })
        })

        await fetchAllNotes(req,res)

        // expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({"Your_Notebook": mockedNotes})

        // res.json.mockRestore()
    })


})


describe("delete a note",()=>{

    it("should delete the project successfully", async()=>{
        const mockedNoteId = 'bac727c4-4178-427a-a239-063f5c58ae86'
        const req = {
            params:{
                id: mockedNoteId
            }
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })

        await deleteNote(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: 'Note deleted successfully'
        })

        res.json.mockRestore()
    })

    it("should return an error when note is not found'", async()=>{
        const mockedNoteId = 'bac727c4-4178-427a-a239-063f5c58ae8ijdfnjknii6'
        const req = {
            params:{
                id: mockedNoteId
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [0]
            })
        })

        await deleteNote(req, res)


        expect(res.json).toHaveBeenCalledWith({
            message: 'Note not found'
        })

        res.json.mockRestore()
    })

})



})