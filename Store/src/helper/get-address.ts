function getAddress({
    address,
    provinceName,
    wardName,
    districtName,
}: {
    address?: string;
    provinceName?: string;
    wardName?: string;
    districtName?: string;
}): string {
    if (!provinceName) return '';

    return `${address || ''} ${wardName}, ${districtName}, ${provinceName}`;
}

export { getAddress };
