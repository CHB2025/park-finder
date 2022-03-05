export type ParkWithFeature = {
   pmaid: string;
   name: string;
   xpos: string;
   ypos: string;
   hours: string;
   feature_desc: string;
   location?: {
      latitude: string;
      longitude: string;
   }

}