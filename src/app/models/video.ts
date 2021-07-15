export class VideoDisplayType {
  id?: string;
  type?: string;
  description?: string;
}

export class Video {
  id?: string;
  mimeType?: string;
  source?: string;
  displayAs?: VideoDisplayType;
  fileId?: string;
  poster?: string;
  thumbnail?: string;
  size?: number;
  description?: string;


  videoDisplayTypeId?: string;
}
