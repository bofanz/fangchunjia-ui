import { queryClient } from '@/main';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import {
  createOrUpdateProjectMediaLayout,
  createProject,
  updateAbout,
  updateProject,
  uploadProjectMedia,
} from './queries';
import { useAuth0 } from '@auth0/auth0-react';
import type { About } from '@/interfaces/about.interface';
import type { Project } from '@/interfaces/project.interface';
import type { MediaLayoutItem } from '@/interfaces/media.interface';
import { toast } from 'sonner';

// MutationOptions with mandatory mutationFn which takes variables and a token
type AuthMutationOptions<TData, TError, TVariables, TContext> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationFn'
> & {
  mutationFn: (variables: TVariables, token: string) => Promise<TData>;
};

// Gets the access token on the of useMutation
const createAuthMutation = <TData, TError, TVariables, TContext>({
  mutationFn,
  ...rest
}: AuthMutationOptions<TData, TError, TVariables, TContext>) => {
  return () => {
    const { getAccessTokenSilently } = useAuth0();

    return useMutation({
      ...rest,
      mutationFn: async (variables: TVariables) => {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://admin.fangchunjia.com/',
            scope: 'write:all',
          },
        });
        return mutationFn(variables, token);
      },
    });
  };
};

export const useUpdateAboutMutation = () => {
  const navigate = useNavigate();
  return createAuthMutation({
    mutationFn: (about: About, token: string) => updateAbout(about, token),
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate({
        to: `/admin/about`,
      });
    },
  })();
};

export const useCreateProjectMutation = () => {
  const navigate = useNavigate();
  return createAuthMutation({
    mutationFn: (project: Partial<Project>, token: string) =>
      createProject(project, token),
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      navigate({
        to: `/admin/projects/$projectId`,
        // @ts-ignore
        params: { projectId: data.data.id },
      });
    },
  })();
};

export const useUpdateProjectMutation = () => {
  const navigate = useNavigate();

  return createAuthMutation({
    mutationFn: (project: Partial<Project>, token: string) =>
      updateProject(project, token),
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      toast('Successfully updated the project');
      navigate({
        to: `/admin/projects/$projectId`,
        // @ts-ignore
        params: { projectId: data.data.id },
      });
    },
  })();
};

export const useUploadProjectMediaMutation = () => {
  return createAuthMutation({
    mutationFn: (
      data: {
        file: File;
        projectId: string;
      },
      token: string,
    ) => uploadProjectMedia(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  })();
};

export const useCreateOrUpdateProjectMediaLayoutMutation = () => {
  return createAuthMutation({
    mutationFn: (
      data: {
        projectId: string;
        mediaLayout: MediaLayoutItem[];
      },
      token: string,
    ) => createOrUpdateProjectMediaLayout(data, token),
    onSuccess: () => {
      toast('Successfully updated the media layout');
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      console.log(err);
      toast.error('Error updating the media layout');
    },
  })();
};
