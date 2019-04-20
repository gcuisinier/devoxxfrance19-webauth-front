# devoxxfrance19-webauth-back
Back project for Demo WebAuthN @ Devoxx France

[Slides](https://fr.slideshare.net/GildasCuisinier/mot-de-passe-oubli-plus-jamais-avec-webauthn-devoxx-france-2019-141432043?qid=ad849a92-1ed0-4fd8-a912-89dbe0934c5d&v=&b=&from_search=1)

## How to run it ?

Checkout both project  :
- https://github.com/gcuisinier/devoxxfrance19-webauth-back
- https://github.com/gcuisinier/devoxxfrance19-webauth-front

### Run Back project

```
cd devoxxfrance19-webauth-back
./mvn spring-boot:run
```

### Run Front project

cd devoxxfrance19-webauth-front
```
cd devoxxfrance19-webauth-front
npm install 
g serve --ssl --host 0.0.0.0 --public-host webauthn.local.gcuisinier.net
```

## Open website

https://webauthn.local.gcuisinier.net:4200
