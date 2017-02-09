package com.specmate.persistency.cdo.internal;

import java.util.ArrayList;

import org.eclipse.emf.cdo.common.commit.CDOChangeSetData;
import org.eclipse.emf.cdo.common.id.CDOID;
import org.eclipse.emf.cdo.common.revision.CDOIDAndVersion;
import org.eclipse.emf.cdo.common.revision.CDORevisionKey;
import org.eclipse.emf.cdo.common.revision.delta.CDOAddFeatureDelta;
import org.eclipse.emf.cdo.common.revision.delta.CDOClearFeatureDelta;
import org.eclipse.emf.cdo.common.revision.delta.CDOFeatureDelta;
import org.eclipse.emf.cdo.common.revision.delta.CDOFeatureDelta.Type;
import org.eclipse.emf.cdo.common.revision.delta.CDOListFeatureDelta;
import org.eclipse.emf.cdo.common.revision.delta.CDORemoveFeatureDelta;
import org.eclipse.emf.cdo.common.revision.delta.CDORevisionDelta;
import org.eclipse.emf.cdo.common.revision.delta.CDOSetFeatureDelta;
import org.eclipse.emf.ecore.EStructuralFeature;

import com.specmate.persistency.event.EChangeKind;

public abstract class DeltaProcessor {

	private CDOChangeSetData data;

	public DeltaProcessor(CDOChangeSetData data) {
		super();
		this.data = data;
	}

	public void process() {
		for (CDOIDAndVersion id : data.getNewObjects()) {
			newObject(id.getID());
		}
		for (CDOIDAndVersion id : data.getDetachedObjects()) {
			detachedObject(id.getID(), id.getVersion());
		}
		for (CDORevisionKey key : data.getChangedObjects()) {
			if (key instanceof CDORevisionDelta) {
				CDORevisionDelta delta = (CDORevisionDelta) key;
				for (CDOFeatureDelta fDelta : delta.getFeatureDeltas()) {
					processDelta(delta.getID(), fDelta);
				}
			}
		}
	}

	private void processDelta(CDOID id, CDOFeatureDelta delta) {
		if (delta.getType().equals(Type.LIST)) {
			CDOListFeatureDelta listDelta = (CDOListFeatureDelta) delta;
			ArrayList<CDOFeatureDelta> deltas = new ArrayList<CDOFeatureDelta>(listDelta.getListChanges());
			for (CDOFeatureDelta nestedDelta : deltas) {
				processDelta(id, nestedDelta);
			}
			return;
		}

		processBasicDelta(id, delta);
	}

	private void processBasicDelta(CDOID id, CDOFeatureDelta delta) {
		switch (delta.getType()) {
		case SET:
			CDOSetFeatureDelta setDelta = (CDOSetFeatureDelta) delta;
			changedObject(id, setDelta.getFeature(), EChangeKind.SET, setDelta.getOldValue(), setDelta.getValue(),
					setDelta.getIndex());
			break;
		case ADD:
			CDOAddFeatureDelta addDelta = (CDOAddFeatureDelta) delta;
			changedObject(id, addDelta.getFeature(), EChangeKind.ADD, null, addDelta.getValue(), addDelta.getIndex());
			break;

		case REMOVE:
			CDORemoveFeatureDelta removeDelta = (CDORemoveFeatureDelta) delta;
			changedObject(id, removeDelta.getFeature(), EChangeKind.REMOVE, null, null, removeDelta.getIndex());
			break;

		case CLEAR:
			CDOClearFeatureDelta clearDelta = (CDOClearFeatureDelta) delta;
			changedObject(id, clearDelta.getFeature(), EChangeKind.CLEAR, null, null, 0);
			break;
		}
	}

	protected abstract void changedObject(CDOID id, EStructuralFeature feature, EChangeKind changeKind, Object oldValue,
			Object newValue, int index);

	protected abstract void newObject(CDOID id);

	protected abstract void detachedObject(CDOID id, int version);

}