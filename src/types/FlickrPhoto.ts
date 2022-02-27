export type FlickrPhoto = {
   id: string;
   owner: string;
   secret: string;
   server: string;
   title: string;
   ispublic: string;
   isfriend: string;
   isfamily: string;
}

export type FlickrPhotoResponse = {
   page: number;
   pages: number;
   perpage: number;
   photo: FlickrPhoto[];
   total: number;
}