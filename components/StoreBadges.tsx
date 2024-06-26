import { ActionIcon, Group, GroupProps, Tooltip } from '@mantine/core';
import { IconBrandSteam } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Game } from '../src/types/games';

interface StoreBadgesProps extends Omit<GroupProps, 'children'> {
    game: Game;
    height: number;
}

export default function({ height, game, ...props }: StoreBadgesProps) {
    const { storeIds: stores } = game;
    const { basePath } = useRouter();

    return (
        <Group wrap="nowrap" {...props}>
            {Object.keys(stores).map((value) => {
                const store = stores[value];
                const name = value === 'epic' ? 'Epic Games' : 'Steam';

                const link =
                    value === 'epic'
                        ? `https://store.epicgames.com/p/${store.slug}`
                        : `https://store.steampowered.com/app/${store}`;

                return (
                    <Tooltip key={name} transitionProps={{ transition: "slide-up" }} label={name} events={{ hover: true, touch: true, focus: true }}>
                        <ActionIcon variant="transparent" size={height} component="a" href={link} target="_blank">
                            {value === 'epic' ? (
                                <img src={`${basePath}/stores/epic-games.webp`} alt="Epic Games" height={height} />
                            ) : (
                                <IconBrandSteam color="white" size={height} />
                            )}
                        </ActionIcon>
                    </Tooltip>
                );
            })}
        </Group>
    );
}
