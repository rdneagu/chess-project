import { Anchor, Group, Stack, Text } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { useRouteError } from 'react-router';
import ButtonAdapter from '@/shared/components/ButtonAdapter/ButtonAdapter';
import TablerIconAdapter from '@/shared/components/TablerIconAdapter/TablerIconAdapter';
import useNavigate from '@/shared/hooks/useNavigate';
import useRedirectBack from '@/shared/hooks/useRedirectBack';
import { isProduction } from '@/shared/util/EnvironmentUtil';

export default function AppError() {
  const { navigateBack, navigateHome } = useNavigate();
  const { countdown } = useRedirectBack({ disabled: true });

  const error = useRouteError();

  return (
    <div className="flex min-h-[inherit] items-center justify-center">
      <div className="grid grid-cols-1 grid-rows-1 items-center gap-8 px-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-16 xl:px-16">
        <Stack gap="xl" className="order-2" align="start">
          <Stack gap="xs" align="start">
            <Text className="text-4xl font-medium">Unexpected error occurred</Text>
            {!isProduction() && error instanceof Error && (
              <div className="border-negative bg-negative/5 text-negative max-w-[500px] rounded border px-2 py-1">
                {error.name}: {error.message}
              </div>
            )}
          </Stack>
          <Stack gap={0} className="text-dimmed">
            <Text>Looks like you&apos;ve hit an unexpected error. The error has been reported automatically.</Text>
            <Group gap="nbsp">
              <span>You will be redirected back in {countdown} seconds.</span>
              <Anchor onClick={navigateBack}>Click here to go back now.</Anchor>
            </Group>
          </Stack>
          <ButtonAdapter onClick={navigateHome} leftSection={<TablerIconAdapter icon={IconHome} />} variant="outline">
            Return to dashboard
          </ButtonAdapter>
        </Stack>
      </div>
    </div>
  );
}
