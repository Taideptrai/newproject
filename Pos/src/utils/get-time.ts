import moment from 'moment';
import _ from 'lodash';
import { IPackage } from '../collections/billing';
import { EBillingPackageType } from '../api/billing-api';

export function isExpiredPackage(expiredTime: string) {
    const endTime = moment(expiredTime);
    const timeCurrent = moment();
    return endTime.diff(timeCurrent, 'days') < 0;
}

export function checkRestrictAction(packagesActive: IPackage[]) {
    return !_.some(packagesActive, (packageAct: IPackage) =>
        !isExpiredPackage(packageAct.expiredAt) && (
            packageAct.packageType === EBillingPackageType.Trial ||
            packageAct.packageType === EBillingPackageType.Omni ||
            packageAct.packageType & EBillingPackageType.Pos
        )
    );
}