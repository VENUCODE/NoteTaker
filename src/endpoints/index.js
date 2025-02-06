const hostUrl = "http://localhost:3300";
export const endpoints = {
  addNote: "/note/add-new",
  deleteNote: "/note/delete",
  updateNote: "/note/update",
  getNotes: "/note/getall",
  getFavs: "/note/getfavs",
  uploadPhotos: "/note/upload-photos",
  //auth endpoints
  login: "/auth/login",
  register: "/auth/register",
};

export default hostUrl;
