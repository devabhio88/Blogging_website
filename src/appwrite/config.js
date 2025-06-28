import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

// Slug is treated as unique id here 

// Post related services that are taken from database instance created from Databases class of appwrite.
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            console.log(userId);
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    // async getPosts(queries = [Query.equal("status", "active")]){
    /// async getPosts(){
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             // queries,  //[Query.equal("status", "active")]
    //             []

    //         )
    //     } catch (error) {
    //         console.log("Appwrite service :: getPosts :: error", error);
    //         return false
    //     }
    // }
        async getPosts(queries = []) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // file upload service that are taken from bucket instance created from Storage class of appwrite.

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),        // will be stored as featuredImage
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
      // console.log(fileId);
      
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
    getFileView(fileId) {
        return this.bucket.getFileView(
            // this.bucketId,
            conf.appwriteBucketId,
             fileId
        );
      }
}


const service = new Service()
export default service

// import conf from '../conf/conf.js';
// import { Client, ID, Databases, Storage, Permission, Role } from "appwrite";

// export class Service{
//   client = new Client();
//   databases;
//   bucket;
  
//   constructor(){
//     this.client
//       .setEndpoint(conf.appwriteUrl)
//       .setProject(conf.appwriteProjectId);
//     this.databases = new Databases(this.client);
//     this.bucket    = new Storage(this.client);
//   }

//   // — POSTS —

//   async createPost({ title, slug, content, featuredImage, status, userId }) {
//     return this.databases.createDocument(
//       conf.appwriteDatabaseId,
//       conf.appwriteCollectionId,
//       slug,
//       { title, content, featuredImage, status, userId }
//     );
//   }

//   async updatePost(slug, { title, content, featuredImage, status }) {
//     return this.databases.updateDocument(
//       conf.appwriteDatabaseId,
//       conf.appwriteCollectionId,
//       slug,
//       { title, content, featuredImage, status }
//     );
//   }

//   async deletePost(slug) {
//     await this.databases.deleteDocument(
//       conf.appwriteDatabaseId,
//       conf.appwriteCollectionId,
//       slug
//     );
//     return true;
//   }

//   async getPost(slug) {
//     return this.databases.getDocument(
//       conf.appwriteDatabaseId,
//       conf.appwriteCollectionId,
//       slug
//     );
//   }

//   async getPosts(queries = []) {
//     return this.databases.listDocuments(
//       conf.appwriteDatabaseId,
//       conf.appwriteCollectionId,
//       queries
//     );
//   }

//   // — FILES —

//   async uploadFile(file) {
//     return this.bucket.createFile(
//       conf.appwriteBucketId,
//       ID.unique(),
//       file,
//       [
//         Permission.read(Role.any())    // ← make file publicly readable
//       ]
//     );
//   }

//   async deleteFile(fileId) {
//     await this.bucket.deleteFile(
//       conf.appwriteBucketId,
//       fileId
//     );
//     return true;
//   }

//   /** Returns a plain URL string for previewing the file */
//   async getFilePreview(fileId) {
//     // console.log(fileId)
//     const { href } = await this.bucket.getFilePreview(
//       conf.appwriteBucketId,
//       fileId
//     );
//     return href;
//   }
// }

// const service = new Service();
// export default service;
