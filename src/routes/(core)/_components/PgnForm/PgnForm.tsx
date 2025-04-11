import { Stack, Textarea, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

type PgnFormProps = {
    initialPgn: string;
    onSubmit: (pgn: string) => void;
};

export default function PgnForm({ initialPgn, onSubmit }: PgnFormProps) {
    const form = useForm({
        initialValues: {
            pgn: initialPgn,
        },
    });

    return (
        <form onSubmit={form.onSubmit((values) => onSubmit(values.pgn))} className="min-w-[600px]">
            <Stack>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Textarea {...form.getInputProps('pgn')} autosize minRows={6} maxRows={6} />
                <Button type="submit" className="ml-auto">
                    Submit
                </Button>
            </Stack>
        </form>
    );
}
