import { BaseForm } from 'uniforms';

function Ionic(parent: any): any {
  class _ extends parent {
    static Ionic = Ionic;

    static displayName = `Ionic${parent.displayName}`;
  }

  return _;
}

export default Ionic(BaseForm);