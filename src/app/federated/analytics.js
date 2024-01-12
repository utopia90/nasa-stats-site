
import dynamic from 'next/dynamic';

const loadAnalytics = () => {
  return import('analytics').then((module) => module.default);
};

export const FederatedAnalytics = dynamic(loadAnalytics, {
  ssr: false,
});