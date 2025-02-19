import { Anchor, Group, Image, Stack, Text } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import notFoundImage from '@/shared/assets/images/404-page-not-found.svg';
import ButtonAdapter from '@/shared/components/ButtonAdapter/ButtonAdapter';
import TablerIconAdapter from '@/shared/components/TablerIconAdapter/TablerIconAdapter';
import useNavigate from '@/shared/hooks/useNavigate';
import useRedirectBack from '@/shared/hooks/useRedirectBack';

export default function AppNotFound() {
  const { navigateBack, navigateHome } = useNavigate();
  const { countdown } = useRedirectBack();

  return (
    <div className="flex min-h-[inherit] items-center justify-center">
      <div className="grid grid-cols-1 grid-rows-2 items-center gap-8 px-8 xl:grid-cols-2 xl:grid-rows-1 xl:gap-16 xl:px-16">
        <Stack gap="xl" className="order-2" align="start">
          <Text className="text-4xl font-medium">Nothing to find</Text>
          <Stack className="text-dimmed" gap={0}>
            <Text>Looks like you&apos;ve navigated to a place that doesn&apos;t exist or has been moved.</Text>
            <Group gap="nbsp">
              <span>You will be redirected back in {countdown} seconds.</span>
              <Anchor onClick={navigateBack}>Click here to go back now.</Anchor>
            </Group>
          </Stack>
          <ButtonAdapter onClick={navigateHome} leftSection={<TablerIconAdapter icon={IconHome} />} variant="outline">
            Return to dashboard
          </ButtonAdapter>
        </Stack>
        <Image src={notFoundImage} alt="Not found" className="order-1 w-[600px] xl:order-2 xl:w-auto" />
      </div>
    </div>
  );
}
