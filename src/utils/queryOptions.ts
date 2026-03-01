import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import {
  createProject,
  updateAbout,
  updateProject,
  uploadProjectMedia,
} from './queries';

export const useUpdateAboutMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateAbout,
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate({
        to: `/admin/about`,
      });
    },
  });
};

export const useCreateProjectMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      navigate({
        to: `/admin/projects/$projectId`,
        // @ts-ignore
        params: { projectId: data.data.id },
      });
    },
  });
};

export const useUpdateProjectMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      navigate({
        to: `/admin/projects/$projectId`,
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
