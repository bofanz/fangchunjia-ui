import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { createProject, uploadProjectMedia } from './queries';

export const useCreateProjectMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      navigate({
        to: `/admin/$projectId`,
        // @ts-ignore
        params: { projectId: data.data.id },
      });
    },
  });
};

export const useUploadProjectMediaMutation = () => {
  return useMutation({
    mutationFn: uploadProjectMedia,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
