import { Field, Input, Label } from '@headlessui/react';
import { useRef, useState } from 'react';

export default function MediaUploader() {
  // async function uploadProjectCover(file: File, projectId: string) {
  //   const presigned = await axios.get<{ uploadUrl: string }>(
  //     `https://api.fangchunjia.com/projects/${projectId}/gen-file-upload-url`,
  //     { params: { filename: file.name } },
  //   );
  //   console.log(file);
  //   // const formData = new FormData();
  //   // formData.append('file', file);
  //   const res = await axios.put(presigned.data.uploadUrl, file, {
  //     headers: {
  //       'Content-Type': 'application/octet-stream',
  //       Accept: '*/*',
  //     },
  //   });
  //   return res;
  // }

  const fileInput = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);
  return (
    <div>
      <Field>
        <Label className="text-sm/6 font-medium text-white">Name</Label>
        <Input
          ref={fileInput}
          type="file"
          multiple
          className="mt-1 block border-b-2 border-black"
          name="media"
          onChange={(x) => {
            if (x.target.files) {
              const files = [];
              for (const file of x.target.files) {
                files.push(file);
                console.log(file);
              }
              setFiles(files);
              console.log('xxx');
              console.log(files);
            } else {
              setFiles(null);
            }
          }}
        />
      </Field>
      {files && files.map((f) => <div>{f.name}</div>)}
    </div>
  );
}
