<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return response()->make($app->basePath('public/index.html'));
});

$app->get('heroes',function (){
    for($i=1;$i<11;$i++){
        $array[] = ['id'=>$i,'name'=>str_random(10)];
    }
   return $array;
});


$app->get('login',function () use ($app){
    $builder = new \Lcobucci\JWT\Builder();

    $signer = new \Lcobucci\JWT\Signer\Hmac\Sha256();

    $token = $builder->set('usr','paralelo')
                     ->setIssuer('http://example.com')
                     ->setAudience('http://example.org')
                     ->setId('4f1g23a12aa', true)
                     ->setIssuedAt(time())
                     ->setNotBefore(time() + 60)
                     ->setExpiration(time() + 3600)
                     ->sign($signer,'test');

    return $token->getToken();
});

$app->get('/key', function() {
    return str_random(32);
});