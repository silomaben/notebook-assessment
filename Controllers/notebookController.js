const {v4} = require('uuid');
const mssql = require ('mssql');
const { sqlConfig } = require('../Config/config');


const notes = [];

class notebook{
    constructor(id,note_title,content,createdAt){
        this.id=id,
        this.note_title=note_title,
        this.content=content,
        this.createdAt=createdAt
    }
}

const createNewNote = async (req,res)=>{
    try {
        const id = v4();
        const currentTime = new Date();
        const {note_title, content} = req.body

        if(!note_title || !content ){
            return res.json({ message: "please input all fields" })
        }

        const pool = await mssql.connect(sqlConfig)

        
        if(pool.connected){
           const result =  await pool.request()
            .input('id',mssql.VarChar, id)
            .input('note_title', mssql.VarChar, note_title)
            .input('content', mssql.VarChar, content)
            .input('createdAt', mssql.Date, currentTime)
            .execute('createNoteProcedure')
            
            if(result.rowsAffected==1){
                console.log('connected jhgijkg');
                return res.json({
                    message: "Note created successfully"
                })
            }else{
                return res.json({message: "Note creation failed"})
            }

            

        }

        

        

    } catch (error) {
        return res.json({message: "run into an error"})
    }
}


const fetchAllNotes = async (req,res)=>{
    try {

        const pool = await (mssql.connect(sqlConfig))

        const notebook = (await pool.request().execute('fetchAllNotes')).recordset
        res.json({Your_Notebook: notebook})
    } catch (error) {
        return res.json({error})
    }
}

const fetchOneNote = async(req,res)=>{
    try {
        const id = req.params.id;

        const pool = await mssql.connect(sqlConfig)

        const note = (await pool.request().input('id', id).execute('fetchOneNote')).recordset

        // const note = notes.filter(note => note.id == id)
        res.json({
            note
        })
    } catch (error) {
        return res.json({error})
    }
}

const updateNote = async(req,res)=>{
    try {
        const id = req.params.id;
        const currentTime = new Date();

        const {note_title, content} = req.body

        if(!note_title || !content ){
            return res.json({ message: "please input all fields" })
        }

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('id',mssql.VarChar, id)
            .input('note_title', mssql.VarChar, note_title)
            .input('content', mssql.VarChar, content)
            .input('createdAt', mssql.Date, currentTime)
            .execute('updateNote')

            if(result.rowsAffected==1){
                return res.json({
                    message: "Note updated successfully"
                })
            }else{
                return res.json({message: "Note not found"})
            }

        }

        // const note_index = notes.findIndex(note => note.id==id);

        // if(note_index < 0){
        //     return res.json({ message: 'Note not found' });
        // }else {
        //     notes[note_index] = new notebook(id,note_title,content,currentTime);
        // }
        // res.json({
        //     message: 'project updated successfully',
        //     project: notes[note_index]
        // })


        
    } catch (error) {
        return res.json({Error:error});
    }
}


const deleteNote = async(req,res)=>{
    try {
        const id = req.params.id;
        // console.log(` the id ${id}`);

        const note_index = notes.findIndex(note => note.id==id);
        const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('id', id)
        .execute('deleteNote')
      
        if(result.rowsAffected == 1){
            res.json({
                    message: 'Note deleted successfully'
            })
        }else{
            res.json({
                message: 'Note not found'
        })
        }

        // console.log(`Note index: ${note_index}`);
        // if(note_index < 0){
        //     return res.json({ message: 'Note not found' });
        // }else {
        //     notes.splice(note_index,1)
        // }
        // res.json({
        //     message: 'Note deleted successfully',
        // })

    } catch (error) {
        return res.json({Error:error});
    }
}


module.exports = {
    createNewNote,
    fetchAllNotes,
    fetchOneNote,
    updateNote,
    deleteNote
}