define([
	"behaviour/trait",
	"behaviour/traits/itrait",
	"basic/shapebuilder",
	"num",
	"basic/utils",
	"engine/input/input",
	"engine/input/tool",
	"engine/map/entity",
	"behaviour/trait",
	"engine/rendering/texture",
	"engine/time/timer",
	"assets/loader",
	"jello"
], function(
    Trait,
    ITrait,
	ShapeBuilder,
	num,
	Utils,
	Input,
	Tool,
	Entity,
	Trait,
	Texture,
	Timer,
	Loader,
	Jello
) {
    var Vector2 = num.Vector2,
        VectorTools = num.VectorTools,
        Jello = require('jello');

    var id = 1;

	var spawnOnClick = ITrait.subclass({
	    initialize: function(args) {
            this.layer = args[0];
            this.clicked = false;
	    },
		update: function(entity) {
		    if(this.clicked && !entity.isClicked()) {
		        this.clicked = false;
		    }
			if(!this.clicked && entity.isClicked()) {
			    this.clicked = true;

                var trait = new Trait("showcase/jumpingcrate");
                Loader.load((function spawn() {
                    // Entity
                    var jumpingCrate = new Entity("jumpingCrate" + id++).addToLayer(this.layer);
                    jumpingCrate.setBody(Jello.BodyFactory.createBluePrint()
                        .world(this.layer.getWorld())
                        .shape(ShapeBuilder.Shapes.Cube)
                        .pointMasses(1)
                        .translate(new Vector2(250, 70))
                        .rotate(0)
                        .scale(Vector2.One.copy())
                        .isKinematic(false)
                        .edgeSpringK(300.0)
                        .edgeSpringDamp(5.0)
                        .shapeSpringK(150.0)
                        .shapeSpringDamp(5.0)
                        .addInternalSpring(0, 2, 300, 10)
                        .addInternalSpring(1, 3, 300, 10)
                        .build()
                    );
                    jumpingCrate.setTexture(new Texture("crate.png")
                        .from([new Vector2(0, 500), new Vector2(0, 0), new Vector2(500, 0)]).to([0,1,2])
                        .from([new Vector2(500, 0), new Vector2(500, 500), new Vector2(0, 500)]).to([2,3,0])
                    );
                    jumpingCrate.setTrait(trait);
                }).bind(this));
			}
		}
	});
	
	return spawnOnClick;
});
