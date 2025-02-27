import { DATABASE_PROVIDE } from 'src/constants/provide';
import { DataSource } from 'typeorm';

export const databaseProvider = [
  {
    provide: DATABASE_PROVIDE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: '172.18.0.3',
        port: 5432,
        username: 'postgres',
        password: 'mysecretpassword',
        database: 'carshare',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
