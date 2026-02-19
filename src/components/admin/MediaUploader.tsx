import { useUploadProjectMediaMutation } from '@/utils/queryOptions';
import {
  Fieldset,
  Field,
  Input,
  RadioGroup,
  Radio,
  Label,
  Button,
} from '@headlessui/react';
import { useRef, useState } from 'react';

export default function MediaUploader({ projectId }: { projectId: string }) {
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

  const mediaSizes = [
    { label: 'Small', value: 's' },
    { label: 'Medium', value: 'm' },
    { label: 'Large', value: 'l' },
  ];
  const [selected, setSelected] = useState(mediaSizes[0]);
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
      {/* <RadioGroup
        className="flex gap-4"
        name="plan"
        value={selected}
        onChange={setSelected}
      >
        {mediaSizes.map((s) => (
          <Field key={s.value} className="flex items-center gap-2 rounded">
            <Radio
              value={s.value}
              className="group flex size-5 items-center justify-center rounded-full border bg-white data-checked:bg-fangchunjia-pink"
            />
            <Label>{s.label}</Label>
          </Field>
        ))}
      </RadioGroup> */}
      {/* <Button className="rounded bg-fangchunjia-black px-4 py-2 text-sm text-white data-active:bg-fangchunjia-pink data-hover:bg-fangchunjia-pink data-disabled:bg-fangchunjia-gray transition">
        Upload
      </Button> */}
    </div>
  );
}
