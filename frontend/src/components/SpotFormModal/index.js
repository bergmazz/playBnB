import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
// import { useModal } from "../../context/Modal";
import {getSpotThunk, newSpotThunk} from "../../store/spots";
import './SpotForm.css';

function SpotFormModal () {
      const dispatch = useDispatch()
      const history = useHistory()

      const [ csrfToken, setCsrfToken ] = useState( '' )

      const [ name, setName ] = useState( '' );
      const [ description, setDescription ] = useState( '' );
      const [ price, setPrice ] = useState( 1 );
      const [ address, setAddress ] = useState( '' );
      const [ city, setCity ] = useState( '' );
      const [ state, setState ] = useState( '' );
      const [ country, setCountry ] = useState( '' );
      const [ previewImage, setPreviewImage ] = useState( '' );
      const [ image1, setImage1 ] = useState( '' );
      const [ image2, setImage2 ] = useState( '' );
      const [ image3, setImage3 ] = useState( '' );
      const [ image4, setImage4 ] = useState( '' );
      const [ errors, setErrors ] = useState( [] )

      const updateAddress = ( e ) => setAddress( e.target.value );
      const updateCity = ( e ) => setCity( e.target.value );
      const updateState = ( e ) => setState( e.target.value );
      const updateCountry = ( e ) => setCountry( e.target.value );
      const updateName = ( e ) => setName( e.target.value );
      const updateDescription = ( e ) => setDescription( e.target.value );
      const updatePrice = ( e ) => setPrice( e.target.value );
      const updatePreviewImage = ( e ) => setPreviewImage( e.target.value )
      const updateImage1 = ( e ) => setImage1( e.target.value )
      const updateImage2 = ( e ) => setImage2( e.target.value )
      const updateImage3 = ( e ) => setImage3( e.target.value )
      const updateImage4 = ( e ) => setImage4( e.target.value )

      const handleSubmit = async ( e ) => {
            e.preventDefault();
            setErrors( [] )
            let errorsArr = []
            if ( !country.length ) {
                  errorsArr.push( 'Country is required' )
            }
            if ( !address.length ) {
                  errorsArr.push( 'Address is required' )
            }
            if ( !city.length ) {
                  errorsArr.push( 'City is required' )
            }
            if ( !state.length ) {
                  errorsArr.push( 'State is required' )
            }
            if ( description.length < 30 ) {
                  errorsArr.push( 'Description needs a minimum of 30 characters' )
            }
            if ( !name.length ) {
                  errorsArr.push( 'Name is required' )
            }
            if ( !price.length || price === 0 ) {
                  errorsArr.push( 'Price is required' )
            }
            if ( !previewImage.length ) {
                  errorsArr.push( 'Preview image is required' )
            }

            setErrors( errorsArr )

            if ( errorsArr.length ) {
                  return errors
            }


            const payload = {
                  address,
                  city,
                  state,
                  country,
                  name,
                  description,
                  price,
                  images: [ previewImage, image1, image2, image3, image4 ]
            };

            let newSpot = await dispatch( newSpotThunk( payload ) )
            if ( newSpot ) {
                  let spotId = newSpot.id
                  history.push( `/spots/${ spotId }` );
                  dispatch( getSpotThunk( spotId ) )
            }
      };

      // const handleCancelClick = ( e ) => {
      //       e.preventDefault();
      //       hideForm();
      // };

      return (
            <section className='spot-form-container'>
                  <h1>Create a new Spot</h1>

                  { errors.map( error => <div className='error-div' key={ error }>{ error }</div> ) }

                  <h3>Where's your place located?</h3>
                  <p>Guests will only get your exact address once they booked a reservation.</p>
                  <form onSubmit={ handleSubmit } className='make-spot-container'>
                        Country<input
                              className='country-street-title-price-image-fields'
                              type="text"
                              placeholder="Country"
                              value={ country }
                              onChange={ updateCountry } />
                        Street Address<input
                              className='country-street-title-price-image-fields'
                              type="text"
                              placeholder="Street address"
                              value={ address }
                              onChange={ updateAddress } />
                        <div>
                              City, State
                        </div>
                        <div className='city-state-div'>
                              <input
                                    className=''
                                    type="text"
                                    placeholder="City"

                                    value={ city }
                                    onChange={ updateCity } />,
                              <input
                                    className='street-field'
                                    type="text"
                                    placeholder="State"

                                    value={ state }
                                    onChange={ updateState } />
                        </div>
                        {/* <div>Latitude / Longitude (optional)</div>
                        <div className='city-state-div'>
                              <input
                                    type="number"
                                    placeholder="Lat"
                                    value={ lat }
                                    onChange={ updateLat } />
                              <input
                                    type="number"
                                    placeholder="Lng"
                                    value={ lng }
                                    onChange={ updateLng } />
                        </div> */}

                        <h2>Describe your place to guests</h2>
                        <h4>Mention the best features of your space, any special amentities like
                              fast wif or parking, and what you love about the neighborhood.</h4><input
                              className='describe-text-area'
                              type="text"
                              value={ description }
                              onChange={ updateDescription } />
                        <h2>Create a Title</h2>
                        <h4>Catch guests' attention with a spot title that highlights what makes
                              your place special.</h4><input
                              className='country-street-title-price-image-fields'
                              type="text"
                              placeholder="Name"
                              value={ name }
                              onChange={ updateName } />
                        <div className='price-div'>
                              <h2>Set a base price for your spot
                              </h2>
                              <h4>Competitive pricing can help your listing stand out and rank higher
                                    in search results.
                              </h4><div>$<input
                                    className='country-street-title-price-image-fields'
                                    type="number"
                                    placeholder="Price"
                                    value={ price }
                                    onChange={ updatePrice } />
                              </div>
                        </div>
                        <h2>Liven up your spot with photos</h2>
                        <h4>Submit a link to at least one photo to publish your spot.</h4>
                        <input
                              className='country-street-title-price-image-fields'
                              type="text"
                              placeholder="Preview Image URL"

                              value={ previewImage }
                              onChange={ updatePreviewImage } />
                        <input
                              className='country-street-title-price-image-fields'
                              type="text"
                              placeholder="Second Image URL"
                              value={ image1 }
                              onChange={ updateImage1 } />
                        <input
                              className='country-street-title-price-image-fields'
                              type="text"
                              placeholder="Third Image URL"
                              value={ image2 }
                              onChange={ updateImage2 } />
                        <input
                              className='country-street-title-price-image-fields'
                              type="text"
                              placeholder="Fourth Image URL"
                              value={ image3 }
                              onChange={ updateImage3 } />
                        <input
                              className='country-street-title-price-image-fields'
                              type="text"
                              placeholder="Fifth Image URL"
                              value={ image4 }
                              onChange={ updateImage4 } />
                        <button type="submit" className='button-class-new-spot'>Create new Spot</button>
                  </form>
            </section>
      );
};

export default SpotFormModal;
