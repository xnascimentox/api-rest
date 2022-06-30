import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrdersIdToOrdersProducts1656616046144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders_products',
        new TableColumn({
            name: 'order_id',
            type: 'uuid',
            isNullable: true,
          }),
        );

        await queryRunner.createForeignKey(
          'orders_products',
        new TableForeignKey({
          name: 'OrdersProductsOrder',
          columnNames: ['order_id'],
          referencedTableName: 'customers',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {


      await queryRunner.dropForeignKey('ordorders_products', 'OrdersProductsProduct'
      );

      await queryRunner.dropColumn('orders_products', 'product_id');
    }

}
