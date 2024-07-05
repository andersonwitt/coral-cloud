class IndexedDBConnection {
  constructor(dbName, version) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }

  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        if (!this.db.objectStoreNames.contains("folders")) {
          const folderStore = this.db.createObjectStore("folders", {
            keyPath: "name",
          });
          folderStore.createIndex("previous", "previous", { unique: false });
          folderStore.createIndex("next", "next", { unique: false });
        }
        if (!this.db.objectStoreNames.contains("files")) {
          const fileStore = this.db.createObjectStore("files", {
            keyPath: "name",
          });
          fileStore.createIndex("folderName", "folderName", { unique: false });
          fileStore.createIndex("buffer", "buffer", { unique: false });
          fileStore.createIndex("type", "type", { unique: false });
          fileStore.createIndex("extension", "extension", { unique: false });
          fileStore.createIndex("size", "size", { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = (event) => {
        console.error("Database error: ", event.target.error);
        reject(event.target.error);
      };
    });
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  async addFile(file) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["files"], "readwrite");
      const store = transaction.objectStore("files");
      const request = store.add(file);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error("Error adding file: ", event.target.error);
        reject(event.target.error);
      };
    });
  }

  async addFolder(folder) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["folders"], "readwrite");
      const store = transaction.objectStore("folders");
      const request = store.add(folder);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error("Error adding folder: ", event.target.error);
        reject(event.target.error);
      };
    });
  }

  async deleteFile(name) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["files"], "readwrite");
      const store = transaction.objectStore("files");
      const request = store.delete(name);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error("Error deleting file: ", event.target.error);
        reject(event.target.error);
      };
    });
  }

  async deleteFolder(name) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["folders"], "readwrite");
      const store = transaction.objectStore("folders");
      const request = store.delete(name);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error("Error deleting folder: ", event.target.error);
        reject(event.target.error);
      };
    });
  }

  async searchFiles(folderName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["files"], "readonly");
      const store = transaction.objectStore("files");
      const index = store.index("folderName");
      const request = index.getAll(folderName);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        console.error("Error searching files: ", event.target.error);
        reject(event.target.error);
      };
    });
  }

  async getAllFolders() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["folders"], "readonly");
      const store = transaction.objectStore("folders");
      
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        console.error("Error retrieving folders: ", event.target.error);
        reject(event.target.error);
      };
    });
  }

  async getAllFiles() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["files"], "readonly");
      const store = transaction.objectStore("files");
      
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        console.error("Error retrieving files: ", event.target.error);
        reject(event.target.error);
      };
    });
  }
}

export default IndexedDBConnection;
