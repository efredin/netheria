import hardwareConfig from '../hardware.yaml';
import { Instance } from '../schema';
import { useQuery } from "react-query";

const hardware = hardwareConfig as Instance[];

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
