export type Deferrable = (...args: unknown[]) => unknown;

export class Deferrer
{
    public disposed = false;
    public deferred: Array<Deferrable> = [];

    defer(deferrable: Deferrable): number {
        if (this.disposed) return -1;
        this.deferred.unshift(deferrable);
        return this.deferred.length;
    }

    clear(): void {
        this.deferred.length = 0;
    }

    [Symbol.dispose](): void {
        for (const deferrable of this.deferred) deferrable();
        this.clear();
        this.disposed = true;
    }

    async [Symbol.asyncDispose](): Promise<void> {
        const promises: Array<unknown> = [];
        for (const deferrable of this.deferred) promises.push(deferrable());
        await Promise.all(promises);
        this.clear();
        this.disposed = true;
    }
}
