import axios from 'redaxios';

export default function Uploader({ status }: { status?: string }) {
  async function uploadProjectCover(file: File, projectId: string) {
    const presigned = await axios.get<{ uploadUrl: string }>(
      `https://api.fangchunjia.com/projects/${projectId}/gen-file-upload-url`,
      { params: { filename: file.name } },
    );
    console.log(file);
    // const formData = new FormData();
    // formData.append('file', file);
    const res = await axios.put(presigned.data.uploadUrl, file, {
      headers: {
        'Content-Type': 'application/octet-stream',
        Accept: '*/*',
      },
    });
    return res;
  }

  return (
    <>
      <div>
        <label htmlFor="file" className="file-input-label">
          Upload
        </label>
        <div className="file-input-status">{status}</div>
        <input
          type="file"
          id="file"
          accept="image/*, audio/*, video/*"
          className="native-file-input"
          onChange={(event) => {
            if (event.target.files?.[0]) {
              uploadProjectCover(event.target.files?.[0], '44kw');
            }
          }}
        />
      </div>
    </>
  );
}
