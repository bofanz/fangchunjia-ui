import { useUploadProjectMediaMutation } from '@/utils/queryOptions';
import clsx from 'clsx';
import { useRef, useState } from 'react';

export default function MediaUploader() {
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
          .mutateAsync({ file: file, projectId: 'arinoroom' })
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
        <label className="text-sm/6 font-medium">
          <input
            ref={fileInput}
            type="file"
            multiple
            className={clsx(
              'mt-1 block border-b-2 border-black disabled:text-gray-400',
            )}
            name="media"
            onChange={handleChange}
            disabled={uploadProjectMediaMutation.isPending}
          />
        </label>
        {Object.entries(uploadStates).map(([name, status]) => (
          <div key={name}>
            <span>{name}</span>
            <span>
              {status === 'pending'
                ? 'Uploading'
                : status === 'success'
                  ? 'Uploaded'
                  : 'Failed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
