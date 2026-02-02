import type { Project } from '@/interfaces/project.interface';
import axios from 'redaxios';

export async function createProject(project: Partial<Project>) {
  return axios.post<null>('https://api.fangchunjia.com/projects', {
    id: project.id,
    name: project.name,
    categoryId: project.categoryId,
    year: project.year,
    description: project.description,
    link: project.link,
  });
}

export async function uploadProjectMedia(data: {
  file: File;
  fileTitle: string;
  projectId: string;
}) {
  console.log('query');
  console.log(data)

  await fetch(`https://api.fangchunjia.com/projects/${data.projectId}/gen-file-upload-url?filename=a.jpg`)
  // return axios.post<null>('https://api.fangchunjia.com/projects', {
  //   id: 'project.id',
  //   name: 'project.name',
  //   categoryId: 'project.categoryaId',
  //   year: 2000,
  //   description: 'project.description',
  //   link: 'project.link',
  // });
  // await axios.get<{ uploadUrl: string }>(
  //   `https://api.fangchunjia.com/projects/${data.projectId}/gen-file-upload-url?filename=${data.file.name}`,
  //   { params: { filename: data.file.name } },
  // );
  // console.log('?????');
  return axios.put('https://fangchunjia.s3.amazonaws.com/projects/44kw/a.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIARLSAAFDVRIJ4WHWE%2F20260131%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20260131T132940Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMyJGMEQCIEc1eAgizJff6aSj9E33Rs66SnjItW7z3zsqBuQQac57AiApFJK99Y%2FBle%2FTz9DqzCfTywZFg1SN0qzY4tz5BnOGjCqLAwi3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDA5MzU0OTc2Njg5MSIMAc%2B4W6RhyktzDZW4Kt8C%2BpuoA4UfoBxvvl31rGbUyU5YaMx%2F2pXi7GwIuhhfvqldDNayvjEyNZOC7WRiNTaqu04CfAAEyaP6I1lpkmhyQ3COnyxt7aS3RO1gP24WZvqDhfcUkG%2FSEPRvS1AChw1F6gPO94k8EN9efltvUcFLn8ZW3U4N2rn4jzF%2BCTDbfcwOx9lrhxYpveyIrXMcJgbWZ8Cy1bBdGmodZCX9GtC9MJsPTCHTvUO1gnxP3l4gcnuRfwztwxs6gQqHvgYlW6KG7zuMSNM6%2BLcfvGkzF1OFthLk9X%2B9VzNtbyiexqrAetLD9kZTvgMt1J8Rl3H0OxUHDUFhXBx7KO1q4olSDRwZ8oqiMeBJG95AMwrrF6pHLaItcQIkTznqouGitszUYxBG42x6u7cw52inIzsxooTKi3D69NgTHjbm8qox4b%2FCkq8FaUItl6GWhjPzq2li7sCZJwrNsHUEsVlkcXTOleR4MMGH%2BMsGOp8BHGnQ2GeplxU%2B9EmZ8YQlqEHEYoQh0de0R%2B0rmvVwdWVJmsm401hSD2jIytZ%2FjAKnlhO2TKpL%2BzEVPfYm0iI%2BJXiNCqo%2Fo6QLgUFvPG2kiI8glyQdjVeNrGQPViGl6XDfypDgl2%2B0lunq2ffVSCILftlMZ0pnBF9HHQa19Pz3hcAjp8pRmVW1ayTFhN7b3NjXKbR9h23XW8x%2BtXwIw3pV&X-Amz-Signature=3cb4df36d25c149c5d37cec9b88bf40399227a52af7775f061f267c17b472796', data.file, {
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: '*/*',
      'x-amz-meta-title': data.fileTitle,
    },
  });
}
