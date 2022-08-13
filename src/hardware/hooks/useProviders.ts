import hardwareConfig from '../hardware.yaml';
import { Hardware } from '..';
import { useQuery } from "react-query";

const hardware = hardwareConfig as Hardware[];

export const useProviders = () => {
  return useQuery<string[]>(['providers'], async () => {
    const providers = hardware.reduce((providers, current) => {
      if (!providers.find(p => p === current.provider)) {
        providers.push(current.provider);
      }
      return providers;
    }, [] as string[]);

    providers.sort();

    return providers;
  });
}
