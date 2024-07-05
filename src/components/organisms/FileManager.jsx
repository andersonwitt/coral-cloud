import { IndexedDBConnection } from '../utils/IndexedDBConnection';
import { useState, useEffect } from 'react';

const FileManager = () => {
    const [dbConnection, setDbConnection] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const connectDB = async () => {
            const connection = new IndexedDBConnection('fileDB', 1);
            await connection.open();
            setDbConnection(connection);
            setLoading(false);
        };
        connectDB();
    }, []);

    // const handleAddFile = async (fileName, filePath) => {
    //     const file = { name: fileName, path: filePath };
    //     await dbConnection.addFile(file);
    //     setFiles([...files, file]);
    // };

    const handleDeleteFile = async (filePath) => {
        await dbConnection.deleteFile(filePath);
        setFiles(files.filter(file => file.path !== filePath));
    };

    const handleSearch = async (searchTerm) => {
        const results = await dbConnection.searchFiles(searchTerm);
        setFiles(results);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>File Manager</h1>
            <div>
                <input type="text" placeholder="Search File" onChange={(e) => handleSearch(e.target.value)} />
                <input type="file"  />
            </div>
            <div>
                {files.map(file => (
                    <div key={file.path}>
                        {file.name}
                        <button onClick={() => handleDeleteFile(file.path)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileManager;