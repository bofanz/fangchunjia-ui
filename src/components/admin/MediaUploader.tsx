import { useUploadProjectMediaMutation } from '@/utils/queryOptions';
import clsx from 'clsx';
import { useRef, useState } from 'react';

export default function MediaUploader({ projectId }: { projectId: string }) {
  const [uploadStates, setUploadStates] = useState<
    Record<string, 'pending' | 'success' | 'error'>
  >({});

  const uploadProjectMediaMutation = useUploadProjectMediaMutation();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []) as File[];
    if (!files.length) return;

    // Set all files to pending
    setUploadStates(Object.fromEntries(files.map((f) => [f.name, 'pending'])));

    // Fire all mutations simultaneously
    await Promise.all(
      files.map((file) =>
        uploadProjectMediaMutation
          .mutateAsync({ file: file, projectId: projectId })
          .then(() =>
            setUploadStates((prev) => ({ ...prev, [file.name]: 'success' })),
          )
          .catch(() =>
            setUploadStates((prev) => ({ ...prev, [file.name]: 'error' })),
          ),
      ),
    );
  };

  const fileInput = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <div>
        <label className="text-sm/6 flex font-medium bg-gray-100 disabled:text-gray-400 w-60 h-40">
          <span className="m-auto">Upload</span>
          <input
            ref={fileInput}
            type="file"
            multiple
            className={clsx('hidden')}
            name="media"
            onChange={handleChange}
            disabled={uploadProjectMediaMutation.isPending}
          />
        </label>
        <div className="mt-2">
          <ul>
            {Object.entries(uploadStates).map(([name, status]) => (
              <li key={name}>
                <div className="flex">
                  <span className="w-0 grow overflow-hidden whitespace-nowrap text-ellipsis">
                    {name}
                  </span>
                  <span>
                    {status === 'pending'
                      ? 'Uploading'
                      : status === 'success'
                        ? 'Uploaded'
                        : 'Failed'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
