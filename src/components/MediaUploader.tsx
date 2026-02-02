import { useUploadProjectMediaMutation } from '@/utils/queryOptions';
import { useRef, useState } from 'react';

export default function MediaUploader({ projectId }: {projectId: string}) {

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

  const uploadProjectMediaMutation = useUploadProjectMediaMutation();
  const [fileTitle, setFileTitle] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <form
      method="post"
      id="uploadMediaForm"
      ref={formRef}
      onSubmit={(event) => {
        console.log('submit')
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.target as HTMLFormElement);
        uploadProjectMediaMutation.mutate({
          file: formData.get('file') as File,
          fileTitle: formData.get('fileTite') as string,
          projectId: projectId,
        });
      }}
    >
      <div className="w-[320px]">
        <div className="flex flex-col mb-4 form-fields">
          <div>
            <label htmlFor="fileTitle">Caption</label>
            <input id="fileTitle" name="fileTitle" onChange={(event) => setFileTitle(event.target.value)} />
          </div>
          <div>
            <div>
              <label htmlFor="file" className="file-input-label">
                Upload
              </label>
              {/* <div className="file-input-status">{uploadProjectMediaMutation.status}</div> */}
              <input
                type="file"
                id="file"
                accept="image/*, audio/*, video/*"
                className="native-file-input"
                disabled={!fileTitle}
                onChange={() => {
                  console.log('??????')
                  // if (event.target.files?.[0]) {
                  //   formRef.current?.submit();
                  // }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}
