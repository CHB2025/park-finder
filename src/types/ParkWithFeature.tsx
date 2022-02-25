export type ParkWithFeature = {
   pmaid: string;
   name: string;
   alt_name?: string;
   xpos?: string;
   ypos?: string;
   feature_id: string;
   hours: string;
   feature_desc: string;
   child_desc?: string;
   field_type?: string;
   youth_only?: string;
   lighting?: string;
   location?: {
      latitude: string;
      longitude: string;
   }

}