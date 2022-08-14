import { uniqueId } from "lodash";
import { useMutation } from "react-query";
import { Octomize } from "../schema";

export interface OctomizeJob extends Octomize {
  jobId: string;
  status: string;
}

export const useSubmitJob = () => {
  return useMutation<OctomizeJob, unknown, Octomize>(
    (config: Octomize) => {
      // simulate job submission to server
      return new Promise<OctomizeJob>((resolve) => {
        setTimeout(() => {
          resolve({
            jobId: uniqueId('job-'),
            status: 'queued',
            ...config
          });
        }, 1000);
      });
    }
  );
}
