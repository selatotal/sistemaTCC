<?php

namespace SistemaTCC\Provider;

use Pimple\Container;
use Pimple\ServiceProviderInterface;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

class DoctrineOrmServiceProvider implements ServiceProviderInterface {

    public function register(Container $app) {

        $app['orm'] = function ($app) {

            $isDevMode = true;
            $config = Setup::createYAMLMetadataConfiguration([(__DIR__ . "/../../../config/orm/")], $isDevMode);

            $conn = [
                'driver'   => 'pdo_mysql',
                'host'     => '127.0.0.1',
                'dbname'   => 'sistema_tcc',
                'user'     => 'root',
                'password' => 'root',
                'charset'  => 'utf8mb4',
            ];

            $em = EntityManager::create($conn, $config);

            return $em;
        };

    }

}
