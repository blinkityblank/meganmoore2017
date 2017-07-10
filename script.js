var Gallery = function (id) {
    this.id = id;
    this.gallery = document.getElementById(this.id);
    this.imgList = this.gallery.getElementsByTagName('img');
    this.max = this.imgList.length;
    this.count = 1;
    this.leftArrow = document.getElementById('left-arrow-' + this.id);
    this.rightArrow = document.getElementById('right-arrow-' + this.id);
    this.imgList[0].style.display = 'inline';
    this.imgList[0].setAttribute('src', this.imgList[0].getAttribute('data-link'));
    this.imgList[1].setAttribute('src', this.imgList[1].getAttribute('data-link'));
    this.imgList[2].setAttribute('src', this.imgList[2].getAttribute('data-link'));
    this.touchStart;
    this.clickRightArrow = function () {
        var current = document.getElementById(this.id + this.count);
        this.count++;
        if (this.count > 1) {
            this.leftArrow.style.visibility = "visible";
        }
        document.getElementById(this.id + this.count).style.display = "inline";
        if (this.count === this.max) {
            this.rightArrow.style.visibility = "hidden";
        }
        if (this.count < this.max - 1) {
            document.getElementById(this.id + (this.count + 1)).setAttribute("src", document.getElementById(this.id + (this.count + 1)).getAttribute("data-link"));
            document.getElementById(this.id + (this.count + 2)).setAttribute("src", document.getElementById(this.id + (this.count + 2)).getAttribute("data-link"));
        }
        setTimeout(function () {
            current.style.marginLeft = -1 * current.clientWidth + "px";
        }.bind(this), 20);
        setTimeout(function () {
            current.style.display = "none";
        }.bind(this), 500);
    };

    this.clickLeftArrow = function () {
        var current = document.getElementById(this.id + (this.count - 1));
        current.style.display = "inline";
        setTimeout(function () {
            current.style.marginLeft = 0;
        }.bind(this), 20);
        if (this.count <= this.max) {
            this.rightArrow.style.visibility = "visible";
        }
        setTimeout(function () {
            document.getElementById(this.id + this.count).style.display = "none";
            this.count--;
            if (this.count === 1) {
                this.leftArrow.style.visibility = "hidden";
            }
        }.bind(this), 500);
    };

    this.leftArrow.addEventListener("click", this.clickLeftArrow.bind(this));

    this.rightArrow.addEventListener("click", this.clickRightArrow.bind(this));

    for (var i = 0; i < this.imgList.length; i++) {
        this.imgList[i].addEventListener("touchstart", function (e) {
            return this.touchStart = e.touches[0];
        }.bind(this));
        this.imgList[i].addEventListener("touchend", function (e) {
            if (e.changedTouches[0].clientX + 100 < this.touchStart.clientX && this.count < this.max) {
                this.clickRightArrow();
            } else if (e.changedTouches[0].clientX > this.touchStart.clientX + 100 && this.count > 1) {
                this.clickLeftArrow();
            } else {
                return false;
            }
        }.bind(this));
    }
};


function moveSideMenu() {
    var sideMenu = document.getElementById("side-menu");
    if (sideMenu.style.top === "-1000px") {
        sideMenu.style.top = "0px"
    } else {
        sideMenu.style.top = "-1000px"
    }
}

function returnSideMenu() {
    var sideMenu = document.getElementById("side-menu");
    if (sideMenu.style.top === "0px") {
        sideMenu.style.top = "-1000px";
    }
}
var list = document.getElementsByTagName("section");

for (var i = 0; i < list.length; i++) {
    list[i].addEventListener("click", returnSideMenu);
}

if (document.getElementById("specimens")) {
    var stdamaseGallery = new Gallery("stdamase");
    var homesGallery = new Gallery("homes");
    var shelterGallery = new Gallery("shelter");
    var specimensGallery = new Gallery("specimens");
}



//Function to add the scrolling animation

(function () // Code in a function to create an isolate scope
    {
        var speed = 500;
        var moving_frequency = 15; // Affects performance !
        var links = document.getElementsByTagName('a');
        var href;
        for (var i = 0; i < links.length; i++) {
            href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
            if (href !== null && href.length > 1 && href.substr(0, 1) == '#') {
                links[i].onclick = function () {
                    var element;
                    var href = this.attributes.href.nodeValue.toString();
                    if (element = document.getElementById(href.substr(1))) {
                        var hop_count = speed / moving_frequency
                        var getScrollTopDocumentAtBegin = getScrollTopDocument();
                        var gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;

                        for (var i = 1; i <= hop_count; i++) {
                            (function () {
                                var hop_top_position = gap * i;
                                setTimeout(function () {
                                    window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin);
                                }, moving_frequency * i);
                            })();
                        }
                    }

                    return false;
                };
            }
        }

        var getScrollTopElement = function (e) {
            var top = 0;

            while (e.offsetParent != undefined && e.offsetParent != null) {
                top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
                e = e.offsetParent;
            }

            return top;
        };

        var getScrollTopDocument = function () {
            return document.documentElement.scrollTop + document.body.scrollTop;
        };
    })();