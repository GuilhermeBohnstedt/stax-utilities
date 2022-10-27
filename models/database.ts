export interface ReadDatabaseOptions {
  entry?: string;
}

export interface WriteDatabaseOptions {
  entry?: string;
  data: Record<string, any>;
}

export interface WindowDatabase {
  database: {
    read: <T>(options: ReadDatabaseOptions) => Promise<T>;
    write: (options: WriteDatabaseOptions) => Promise<boolean>;
  };
}
