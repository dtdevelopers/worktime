export class FileDTO {
  name: string | null;
  extension: string | null;
  bucket: string | null;
  storageId: string | null;
  createdDate: Date | null;
  content: string;
}
