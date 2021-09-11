import { RouterProps } from 'react-router';
import { BaseProps, SystemInfo } from 'types/shared';
import { PostInfo } from 'types/post';

export interface DashBoardState {
    systemInfo: SystemInfo;
    posts: PostInfo[];
    step: number;
    downCount: number;
}

export interface DashBoardProps extends BaseProps, RouterProps, DashBoardState {
}


