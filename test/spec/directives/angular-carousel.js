/*describe('Directive: Angular-Carousel', function () {
  beforeEach(module('ngswipeDemoApp'));

  var element, $compile, $rootScope, spinner, view, CarouselPositioner;

  beforeEach(inject(function ($injector, _$compile_, _$rootScope_, _CarouselPositioner_) {
    $compile  = _$compile_;
    $rootScope = _$rootScope_;
    CarouselPositioner = _CarouselPositioner_
    $rootScope.pages = ['Article 1', 'Article 2', 'Article 3'];
    view = '<div ng-carousel="page in pages" style="height: 100%" carousel-change="onCarouselChange">'+
                  '<div class="page">'+
                    '<div class="article">'+
                      '<div class="body" ng-bind="page"></div>'+
                    '</div>'+
                  '</div>'+
                '</div>';

    element = $compile(view)($rootScope);

    $rootScope.$digest();
  }));

  it('should render the provided items in individual slider elements', function () {
    expect(element.html()).toContain('Article 1');
    expect(element.html()).toContain('Article 2');
    expect(element.html()).toContain('Article 3');
  })

  it('should seamlessly respond to changes in the bound list of items', function () {
    $rootScope.pages = ['New thing', 'Article 2', 'Other New Thing'];
    $rootScope.$digest();

    expect(element.html()).toContain('New thing');
  });

  it('should allow making an arbitrary index in the carousel active', function () {
    $rootScope.pageIndex = 2;
    element = $compile(view)($rootScope);
    $rootScope.$digest();
    
    expect(CarouselPositioner.frames[1].pageId).toEqual(2);
  });

  it('should accept a method to respond to carouselChanges', function () {
    $rootScope.onCarouselChange = function (value) {
      $rootScope.carouselHasChanged = value;
    }
    element = $compile(view)($rootScope);
    $rootScope.pageIndex = 2;
    $rootScope.$digest();

    expect($rootScope.carouselHasChanged).toEqual(2);
  })
});*/