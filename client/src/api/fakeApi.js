const delayedPromise = (mock) => () => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve(mock);
        }, getRandomDelay())
    })
}

const getRandomDelay = () => {
    return Math.random(1) * 1000;
}

const fakeProducts = [{
        "name": "T-Shirt",
        "code": "TSHIRT",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed aliquet neque. Quisque in mi ut justo imperdiet egestas. Cras sed sagittis eros, ac euismod est. Phasellus consequat luctus ipsum, eget iaculis nibh elementum at. Etiam nec erat varius, gravida felis ut, sagittis neque. Suspendisse potenti. Aliquam eu neque sollicitudin, vulputate sapien ut, vestibulum erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend justo nec magna semper, sed malesuada magna viverra. Nulla libero tellus, viverra sit amet pellentesque a, tincidunt ac erat. Morbi vehicula sagittis vestibulum. Phasellus tincidunt sem vitae sollicitudin pulvinar. Pellentesque et facilisis ligula, eleifend porta est. Sed placerat odio eget purus suscipit dictum. In viverra malesuada ipsum. Sed sollicitudin, lacus eu varius suscipit, est urna condimentum odio, imperdiet mattis massa felis quis dui. Nunc pellentesque nunc eu neque imperdiet congue. Etiam arcu sapien, accumsan a eros in, blandit sollicitudin orci. Donec tempus efficitur diam ut pharetra. Proin eu pellentesque justo, ac cursus ligula. In eget posuere dolor. Fusce nec fermentum libero. Praesent magna sapien, dictum vitae varius eget, elementum non risus. Vestibulum cursus pharetra semper. Etiam interdum quam mauris, ut vulputate leo gravida nec. Suspendisse a diam sapien. Duis ac purus a urna dignissim mattis eget et velit. Aenean elementum orci a augue aliquet vulputate. Sed in est at tortor volutpat luctus in ut mi. Mauris vel aliquet ex.",
        "imageSrc": "http://localhost:3001/shirt.png",
        "fullimageSrc": "http://localhost:3001/shirt.jpg",
        "price": 20,
        "maxItems": 10
    },
    {
        "name": "Coffee Mug",
        "code": "MUG",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed aliquet neque. Quisque in mi ut justo imperdiet egestas. Cras sed sagittis eros, ac euismod est. Phasellus consequat luctus ipsum, eget iaculis nibh elementum at. Etiam nec erat varius, gravida felis ut, sagittis neque. Suspendisse potenti. Aliquam eu neque sollicitudin, vulputate sapien ut, vestibulum erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend justo nec magna semper, sed malesuada magna viverra. Nulla libero tellus, viverra sit amet pellentesque a, tincidunt ac erat. Morbi vehicula sagittis vestibulum. Phasellus tincidunt sem vitae sollicitudin pulvinar. Pellentesque et facilisis ligula, eleifend porta est. Sed placerat odio eget purus suscipit dictum. In viverra malesuada ipsum. Sed sollicitudin, lacus eu varius suscipit, est urna condimentum odio, imperdiet mattis massa felis quis dui. Nunc pellentesque nunc eu neque imperdiet congue. Etiam arcu sapien, accumsan a eros in, blandit sollicitudin orci. Donec tempus efficitur diam ut pharetra. Proin eu pellentesque justo, ac cursus ligula. In eget posuere dolor. Fusce nec fermentum libero. Praesent magna sapien, dictum vitae varius eget, elementum non risus. Vestibulum cursus pharetra semper. Etiam interdum quam mauris, ut vulputate leo gravida nec. Suspendisse a diam sapien. Duis ac purus a urna dignissim mattis eget et velit. Aenean elementum orci a augue aliquet vulputate. Sed in est at tortor volutpat luctus in ut mi. Mauris vel aliquet ex.",
        "imageSrc": "http://localhost:3001/mug.png",
        "fullimageSrc": "http://localhost:3001/mug.jpg",
        "price": 5,
        "maxItems": 6
    },
    {
        "name": "Cap",
        "code": "CAP",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed aliquet neque. Quisque in mi ut justo imperdiet egestas. Cras sed sagittis eros, ac euismod est. Phasellus consequat luctus ipsum, eget iaculis nibh elementum at. Etiam nec erat varius, gravida felis ut, sagittis neque. Suspendisse potenti. Aliquam eu neque sollicitudin, vulputate sapien ut, vestibulum erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend justo nec magna semper, sed malesuada magna viverra. Nulla libero tellus, viverra sit amet pellentesque a, tincidunt ac erat. Morbi vehicula sagittis vestibulum. Phasellus tincidunt sem vitae sollicitudin pulvinar. Pellentesque et facilisis ligula, eleifend porta est. Sed placerat odio eget purus suscipit dictum. In viverra malesuada ipsum. Sed sollicitudin, lacus eu varius suscipit, est urna condimentum odio, imperdiet mattis massa felis quis dui. Nunc pellentesque nunc eu neque imperdiet congue. Etiam arcu sapien, accumsan a eros in, blandit sollicitudin orci. Donec tempus efficitur diam ut pharetra. Proin eu pellentesque justo, ac cursus ligula. In eget posuere dolor. Fusce nec fermentum libero. Praesent magna sapien, dictum vitae varius eget, elementum non risus. Vestibulum cursus pharetra semper. Etiam interdum quam mauris, ut vulputate leo gravida nec. Suspendisse a diam sapien. Duis ac purus a urna dignissim mattis eget et velit. Aenean elementum orci a augue aliquet vulputate. Sed in est at tortor volutpat luctus in ut mi. Mauris vel aliquet ex.",
        "imageSrc": "http://localhost:3001/cap.png",
        "fullimageSrc": "http://localhost:3001/cap.jpg",
        "price": 10,
        "maxItems": 20
    }
];

const fakeDiscounts = {
    "MUG": [{
        "id": "XforY",
        "minProducts": 2,
        "freeProducts": 1
    }],
    "TSHIRT": [{
        "id": "bulkDiscount",
        "minProducts": 3,
        "discountPercentage": 5
    }]
};

export const api = {
    getProducts: delayedPromise(fakeProducts),
    getDiscounts: delayedPromise(fakeDiscounts),
}